import {validateEmail, validatePassword} from "../../components";
import {type ChangeEvent, type FocusEvent, type FormEvent, useEffect} from "react";
import {useState} from "react";
import {
  type User,
  type InfoForm,
  type PasswordForm,
  getValidAccessToken,
  getUserInfo,
} from "../../utils";
import {getMethod, postMethod, putMethod} from "../../utils";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

export function useProfile() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState('student');
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [infoFormData, setInfoFormData] = useState<InfoForm>({
    name: '',
    email: '',
    avatar_info: null
  });

  const [passwordFormData, setPasswordFormData] = useState<PasswordForm>({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const [helperTexts, setHelperTexts] = useState({
    name: '',
    email: '',
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const [touchedInfo, setTouchedInfo] = useState({
    name: false,
    email: false
  });

  const [touchedPassword, setTouchedPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_new_password: false
  })

  const validateField = (name: keyof InfoForm | keyof PasswordForm, value: string) => {
    let error = ""

    switch (name) {
      case "name":
        if (!value) {
          error = "Vui lòng nhập tên"
        }
        break;

      case "email":
        if (!value) {
          error = "Vui lòng nhập email"
        }
        else if (!validateEmail(value)) error = "Địa chỉ email không hợp lệ"
        break;

      case "old_password":
        if (!value) error = "Vui lòng nhập mật khẩu hiện tại"
        else if (!validatePassword(value, 8)) error = "Vui lòng nhập tối thiểu 8 ký tự"
        else if (passwordFormData.new_password && value === passwordFormData.new_password)
          error = 'Mật khẩu mới phải khác mật khẩu cũ '
        break;

      case "new_password":
        if (!value) error = "Vui lòng nhập mật khẩu mới"
        else if (!validatePassword(value, 8)) error = "Vui lòng nhập tối thiểu 8 ký tự"
        else if (passwordFormData.old_password && value === passwordFormData.old_password)
          error = 'Mật khẩu mới phải khác mật khẩu cũ '
        break;

      case "confirm_new_password":
        if (!value) error = "Vui lòng nhập lại mật khẩu mới"
        else if (passwordFormData.new_password && value !== passwordFormData.new_password)
          error = 'Phải trùng khớp với mật khẩu mới! '
        break;
    }

    setHelperTexts(prev => ({ ...prev, [name]: error }));
    return !error;
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["name", "email"].includes(name)) {
      setTouchedInfo(prev => ({ ...prev, [name]: true }));
    } else if (["old_password", "new_password", "confirm_new_password"].includes(name)) {
      setTouchedPassword(prev => ({ ...prev, [name]: true }));
    }

    validateField(name as keyof InfoForm | keyof PasswordForm, value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (['old_password', 'new_password', 'confirm_new_password'].includes(name)) {
      setPasswordFormData(prev => ({...prev, [name]: value}))
    } else {
      setInfoFormData(prev => ({...prev, [name]: value}));
    }

    if (
      (["name", "email"].includes(name) && touchedInfo[name as keyof typeof touchedInfo]) ||
      (["old_password", "new_password", "confirm_new_password"].includes(name) && touchedPassword[name as keyof typeof touchedPassword])
    ) {
      validateField(name as keyof InfoForm | keyof PasswordForm, value);
    }
  }


  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] ?? null;
    if (file) {
      const previewURL: string = URL.createObjectURL(file);

      setInfoFormData({
        ...infoFormData,
        avatar_info: {
          id: null,
          url: previewURL,
        }
      });
    }
    setAvatarFile(file);
  };

  const onSubmitInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set all touched to true
    setTouchedInfo({
      name: true,
      email: true
    })

    // check valid
    const isValid: boolean = validateField('name', infoFormData.name) && validateField('email', infoFormData.email);
    if (!isValid) return;

    // submit logic
    const formData = new FormData();
    formData.append('name', infoFormData.name);
    formData.append('email', infoFormData.email);

    if(avatarFile){
      formData.append('avatar', avatarFile);
    }

    const accessToken: string | null = await getValidAccessToken();
    const response = await putMethod(`/${role}s/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if(response !== null){
      toast.success('Cập nhật thông tin thành công!');
    }else{
      toast.error('Cập nhật thất bại!')
    }

  }

  const onSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set all touched to true
    setTouchedPassword({
      old_password: true,
      new_password: true,
      confirm_new_password: true
    });

    // check valid
    const isValid: boolean =
      validateField('old_password', passwordFormData.old_password)
      && validateField('new_password', passwordFormData.new_password)
      && validateField('confirm_new_password', passwordFormData.confirm_new_password);
    if(!isValid) return;

    // submit logic
    const payload = {
      old_password: passwordFormData.old_password,
      new_password: passwordFormData.new_password
    }
    const accessToken: string | null = await getValidAccessToken();
    const response = await postMethod('/users/change-password', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response);

    if(!response){
      toast.error('Sai mật khẩu cũ!');
    }else{
      toast.success('Thay đổi mật khẩu thành công!');
    }

  }

  useEffect(() => {
    const onMounted = async () => {
      const accessToken: string | null = await getValidAccessToken();
      if(!accessToken){
        console.error("No valid access token, redirecting to login page");
        navigate('/login');
        return;
      }

      const {sub, role} = getUserInfo(accessToken);
      setUserId(Number(sub));
      setRole(role);

      try{
        const userData: User = await getMethod(`/${role}s/${sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(userData);

        const {name, email, profile} = userData;

        setInfoFormData({
          name,
          email,
          avatar_info: profile || null
        })
      }catch (err) {
        console.error("Error on loading courses: ",err);
      }finally {
        setIsLoadingInfo(false);
      }
    }
    onMounted();
  }, []);


  return {
    infoFormData,
    passwordFormData,
    touchedInfo,
    touchedPassword,
    helperTexts,
    handleFileUpload,
    onChange,
    onSubmitInfo,
    onSubmitPassword,
    handleBlur,
    isLoadingInfo
  };
}
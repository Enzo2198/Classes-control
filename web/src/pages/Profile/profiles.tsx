import {validateConfirmPassword, validateEmail, validateName, validatePassword} from "../../components";
import {type ChangeEvent, type FocusEvent, type FormEvent, useEffect} from "react";
import {useState} from "react";
import {getValidAccessToken} from "../../router/auth.ts";
import type {User, InfoForm, PasswordForm} from "../../utils";
import {getMethod, postMethod, putMethod} from "../../utils";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {useUser} from "../../plugins/user.ts";

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

  const [infoHelperTexts, setInfoHelperTexts] = useState({
    name: '',
    email: ''
  });

  const [passwordHelperTexts, setPasswordHelperTexts] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  })

  const [touchedInfo, setTouchedInfo] = useState({
    name: false,
    email: false
  });

  const [touchedPassword, setTouchedPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_new_password: false
  })

  const checkPasswordLength = (value: string, field: "old_password" | "new_password") => {
    if (!validatePassword(value, 8)) {
      setPasswordHelperTexts(prev => ({
        ...prev,
        [field]: "Vui lòng nhập tối thiểu 8 ký tự!"
      }));
      return false;
    }
    return true;
  };


  const validate = {
    name: (value: string) => {
      if (!validateName(value)) {
        setInfoHelperTexts((prev) => ({
          ...prev,
          name: 'Vui lòng nhập tên của bạn!'}));
        return false;
      }
      setInfoHelperTexts((prev) => ({...prev, name: ''}));
      return true;
    },

    email: (value: string) => {
      if (!value.trim()) {
        setInfoHelperTexts(prev => ({ ...prev, email: "Vui lòng nhập email!" }));
        return false;
      }
      if (!validateEmail(value)) {
        setInfoHelperTexts(prev => ({ ...prev, email: "Địa chỉ email không hợp lệ!" }));
        return false;
      }
      setInfoHelperTexts(prev => ({ ...prev, email: "" }));
      return true;
    },

    old_password: (value: string) => {
      if (!checkPasswordLength(value, "old_password")) return false;

      if (passwordFormData.new_password && value === passwordFormData.new_password) {
        setPasswordHelperTexts((prev) => ({
          ...prev,
          new_password: "Mật khẩu mới phải khác mật khẩu cũ!",
        }));
        return false;
      }
      setPasswordHelperTexts((prev) => ({ ...prev, old_password: "" }));
      return true;
    },

    new_password: (value: string) => {
      if (!checkPasswordLength(value, "new_password")) return false;

      if (passwordFormData.old_password && value === passwordFormData.old_password) {
        setPasswordHelperTexts((prev) => ({
          ...prev,
          new_password: "Mật khẩu mới phải khác mật khẩu cũ!",
        }));
        return false;
      }
      setPasswordHelperTexts((prev) => ({ ...prev, new_password: "" }));
      return true;
    },

    confirm_new_password: (value: string) => {
      if (!validateConfirmPassword(passwordFormData.new_password, value)) {
        setPasswordHelperTexts((prev) => ({
          ...prev,
          confirm_new_password: "Mật khẩu nhập lại phải trùng khớp!",
        }));
        return false;
      }
      setPasswordHelperTexts((prev) => ({ ...prev, confirm_new_password: "" }));
      return true;
    },
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (['email', 'name'].includes(name)) {
      setTouchedInfo({
        ...touchedInfo,
        [e.target.name]: true
      });
      validate[name as 'email' | 'name'](value);
    }

    if (['old_password', 'new_password', 'confirm_new_password'].includes(name)) {
      setTouchedPassword({
        ...touchedPassword,
        [e.target.name]: true
      });
      validate[name as 'old_password' | 'new_password' | 'confirm_new_password'](value);
    }

  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isPasswordField = ['old_password', 'new_password', 'confirm_new_password'].includes(name);

    if (isPasswordField) {
      setPasswordFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setInfoFormData(prev => ({ ...prev, [name]: value }));
    }

    validate[name as keyof typeof validate]?.(value);
  };


  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] ?? null;
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    // cleanup URL when changing avatar
    if (infoFormData.avatar_info?.url) {
      URL.revokeObjectURL(infoFormData.avatar_info.url);
    }

    setInfoFormData((prev) => ({
      ...prev,
      avatar_info: { id: null, url: previewURL },
    }));

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
    const isValid: boolean = validate.name(infoFormData.name) && validate.email(infoFormData.email);
    if (!isValid) return;

    // submit logic
    const formData = new FormData();
    formData.append('name', infoFormData.name);
    formData.append('email', infoFormData.email);

    if(avatarFile){
      formData.append('avatar', avatarFile);
    }

    const accessToken: string | null = await getValidAccessToken();
    const response = await putMethod(`/${role}s/${userId}`, formData,{
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
      validate.old_password(passwordFormData.old_password)
      && validate.new_password(passwordFormData.new_password)
      && validate.confirm_new_password(passwordFormData.confirm_new_password);
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
      toast.error('Sai mật khẩu cũ hoặc lỗi kết nối!');
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

      const { user } = useUser.getState(); // Get from Zustand
      const sub = user.id || "";
      const role = user.role || "student";

      if (!sub) {
        console.warn("Token chưa decode được user.id");
        navigate("/login");
        return;
      }

      setUserId(Number(sub));
      setRole(role);

      try{
        const userData: User = await getMethod(`/${role}s/${sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

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
    infoHelperTexts,
    passwordHelperTexts,
    handleFileUpload,
    onChange,
    onSubmitInfo,
    onSubmitPassword,
    handleBlur,
    isLoadingInfo
  };
}
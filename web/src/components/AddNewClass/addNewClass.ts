import {useEffect, useState} from "react";
import {getValidAccessToken, type NewClassForm, postMethod} from "../../utils";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

export function useAddNewClass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewClassForm>({
    name: '',
    code: ''
  })
  const [helperText, setHelperText] = useState<NewClassForm>({
    name: '',
    code: ''
  })
  const [touched, setTouched] = useState({
    name: false,
    code: false
  })

  const validate = (name: keyof NewClassForm, value: string) => {
    let error = ""
    switch (name) {
      case 'name':
        if (!value) error = 'Vui lòng nhập tên lớp học'
        break;

      case 'code':
        if (!value) error = 'Vui lòng nhập mã bảo vệ'
        else if (value.length < 6) error = 'Vui lòng nhập tối thiểu 6 ký tự'
        break;
    }

    setHelperText(prev => ({...prev, [name]: error}))
    return !error
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))

    if (touched[name as keyof NewClassForm]) validate(name as keyof NewClassForm, value)
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTouched(prev => ({...prev, [name]: true}))
    validate(name as keyof NewClassForm, value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Set all touched true
    const curTouched = {...touched}
    Object.keys(touched).forEach((key) => {
      curTouched[key as keyof NewClassForm] = true
    })
    setTouched(curTouched)

    // Check valid
    const isValid: boolean = validate('name', formData.name) && validate('code', formData.code)
    if (!isValid) return

    // Submit logic
    const payload = {
      name: formData.name,
      code: formData.code,
    }

    const accessToken: string | null = await getValidAccessToken()
    const response = await postMethod('/classes', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response) {
      toast.error('Tạo lớp học không thành công!')
    } else {
      toast.success('Tạo lớp học mới thành công!')
      navigate('/classes')
    }
  }

  const onCancel = () => {
    setFormData({name: '', code: ''})
    setHelperText({name: '', code: ''})
    setTouched({name: false, code: false})
    navigate('/classes')
  }

  useEffect(() => {
    const onMounted = async () => {
      const accessToken: string | null = await getValidAccessToken()
      if (!accessToken) {
        console.error('No valid access token, redirecting to login page')
        navigate('/login')
        return
      }
    }
    onMounted()
  }, [])

  return {formData, onChange, onSubmit, onBlur, helperText, touched, onCancel};
}
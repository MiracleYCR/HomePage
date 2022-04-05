import { reactive, ref } from 'vue'

function useFormProperties (t: any) {
  const ruleFormRef = ref()

  const ruleForm = reactive({
    mobile: '',
    password: ''
  })

  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t('login.placeMobile'),
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: t('login.placePass'),
        trigger: 'blur'
      }
    ]
  })

  return {
    ruleFormRef,
    ruleForm,
    rules
  }
}

export default useFormProperties

import { useState } from "react";

const useInput = (defaultValue, validation) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  // 입력창 focus 해제 여부 관리하는 상태
  const [didEdit, seteDidEdit] = useState(false);

  const valueIsValid = validation(enteredValue)

  const handleChangeInput = (event) => {
    setEnteredValue(event.target.value);

    // 입력중엔 focus 되어있다
    seteDidEdit(false);
  };

  // focus를 잃은 경우
  const handleInputBlur = () => {
    seteDidEdit(true);
  };

  return {
    value: enteredValue,
    handleChangeInput,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
};


export default useInput;
import * as yup from "yup";

const checkTransferSchema = ({ userAmount, isThreshold, contractNumber }) => {
  if (isThreshold) {
    return yup.object().shape({
      value: yup
        .number()
        .required("Введите сумму")
        .positive("Введите сумму")
        .nullable(true)
        .max(userAmount, "Сумма перевода больше чем доступно на счете"),
      contractors: yup.array().required("Выберите контрагента"),
      contractNumber: yup
        .string()
        .test(contractNumber, 'Номер контракта состоит из 10 цифр', val => val.length >= 10)
        .required("Введите номер контракта")
    });
  } else {
    return yup.object().shape({
      value: yup
        .number()
        .required("Введите сумму")
        .positive("Введите сумму")
        .nullable(true)
        .max(userAmount, "Сумма перевода больше чем доступно на счете"),
      contractors: yup.array().required("Выберите контрагента"),
    });
  }
};

export default checkTransferSchema;

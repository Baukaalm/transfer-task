import React, { useState } from "react";
import { connect } from "react-redux";
import GridRow from "arui-feather/grid-row";
import GridCol from "arui-feather/grid-col";
import Amount from "arui-feather/amount";
import Form from "arui-feather/form";
import FormField from "arui-feather/form-field";
import Heading from "arui-feather/heading";
import MoneyInput from "arui-feather/money-input";
import Input from "arui-feather/input";
import Select from "arui-feather/select";
import Button from "arui-feather/button";
import { validateFields } from "../../../lib/validator";
import checkTransferSchema from "../schemas";
import { sendTransfer } from "../actions";

const options = [
  { value: "01", text: "ИП Фридман М.М." },
  { value: "02", text: "ООО «Виктори»" },
  { value: "03", text: "ФГУП НПП ВНИИЭМ" },
];

const Transfer = ({ isTransfered, sendTransfer, user }) => {
  const [form, setForm] = useState({
    amount: "",
    value: null,
    contractors: [],
    contractNumber: "",
    errors: {},
  });

  const [isThreshold, setIsThreshold] = useState(false);

  const AMOUNT = {
    value: user.amount,
    currency: {
      code: "USD",
      minority: 0,
    },
  };

  const handleChange = (amount, value) => {
    if (value > user.threshold) {
      setIsThreshold(true);
    } else {
      setIsThreshold(false);
    }
    setForm({
      ...form,
      amount,
      value,
    });
  };

  const handleSelectChange = (contractors) => {
    setForm({
      ...form,
      contractors,
    });
  };

  const handleContractChange = (value) => {
    setForm({
      ...form,
      contractNumber: Number(value),
    });
  };

  const handleSubmit = () => {
    const transferSchema = checkTransferSchema({
      userAmount: user.amount,
      isThreshold,
      contractNumber: form.contractNumber,
    });
    transferSchema.isValid(form).then((valid) => {
      if (!valid) {
        const errors = validateFields(form, transferSchema);
        setForm({
          ...form,
          errors,
        });
      } else {
        sendTransfer(true);
      }
    });
  };

  console.info(form.errors);

  return (
    <GridRow justify="center">
      {!isTransfered && (
        <GridCol width="4" align="middle">
          <Heading size="l">
            {user.name} {user.surname}
          </Heading>
          <Amount size="xl" amount={AMOUNT} />
          <br />
          <br />
          <br />

          <Form width="available" onSubmit={handleSubmit}>
            <FormField width="available">
              <MoneyInput
                showCurrency={true}
                name="amount"
                width="available"
                value={form.amount}
                onChange={handleChange}
                error={form.errors?.value}
                currencyCode="USD"
                bold={true}
                integerLength={100}
                fractionLength={2}
                placeholder="Введите сумму"
              />
              <FormField width="available">
                <br />

                <Select
                  mode="check"
                  options={options}
                  onChange={handleSelectChange}
                  label="Контрагент"
                  error={form.errors?.contractors}
                  width="available"
                  view="filled"
                />
              </FormField>
              {isThreshold && (
                <FormField>
                  <Input
                    size="l"
                    width="available"
                    maxLength={10}
                    placeholder="Введите номер контракта"
                    error={form.errors?.contractNumber}
                    value={form.contractNumber}
                    resetError={false}
                    onChange={handleContractChange}
                  />
                </FormField>
              )}
            </FormField>
            <FormField>
              <Button view="extra" type="submit">
                Отправить
              </Button>
            </FormField>
          </Form>
        </GridCol>
      )}
      {isTransfered && (
        <div
          style={{
            marginTop: 50,
            border: "1px #e8e8e8 solid",
            borderRadius: "3px",
            padding: "16px",
          }}
        >
          <p view="lead">Перевод прошел успешно</p>
        </div>
      )}
    </GridRow>
  );
};

const mapStateToProps = (state) => ({
  isTransfered: state.transfer.isTransfered,
  user: state.user,
});

export default connect(mapStateToProps, { sendTransfer })(Transfer);

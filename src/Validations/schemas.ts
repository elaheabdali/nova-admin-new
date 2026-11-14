import * as Yup from 'yup';
import type { TranslationKey } from '../Dictionary';

const msg = (key: TranslationKey) => key;

export const productSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required(msg('validationRequired'))
    .min(3, msg('validationRequired')),
  description: Yup.string().trim().required(msg('validationRequired')),
  price: Yup.number()
    .typeError(msg('invalidPrice'))
    .positive(msg('invalidPrice'))
    .required(msg('validationRequired')),
  category: Yup.string().required(msg('validationRequired')),
  image: Yup.string()
    .url(msg('invalidUrl'))
    .required(msg('validationRequired')),
});

export const userSchema = Yup.object({
  name: Yup.object({
    firstname: Yup.string().trim().required(msg('validationRequired')),
    lastname: Yup.string().trim().required(msg('validationRequired')),
  }),
  username: Yup.string()
    .trim()
    .min(3, msg('validationRequired'))
    .required(msg('validationRequired')),
  email: Yup.string()
    .email(msg('invalidEmail'))
    .required(msg('validationRequired')),
  password: Yup.string()
    .min(6, msg('minPassword'))
    .required(msg('validationRequired')),
  phone: Yup.string().trim().required(msg('validationRequired')),
});

export const loginSchema = Yup.object({
  username: Yup.string().required(msg('validationRequired')),
  password: Yup.string().required(msg('validationRequired')),
});

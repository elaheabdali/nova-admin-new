import { useState } from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useAppDispatch } from '../Redux/hooks';
import { createUser } from '../Redux/usersSlice';
import type { UserInput } from '../types';
import { userSchema } from '../Validations/schemas';
import {
  Alert,
  Button,
  Card,
  Field,
  Input,
  PageTitle,
} from '../Shared/primitives';
import { useTranslation } from '../Shared/useTranslation';
import { ROUTES } from '../Routes/routePaths';

const FormGrid = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .footer {
    grid-column: 1/-1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 8px;
  }
`;

export function CreateUserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const t = useTranslation();
  type TranslationKey = Parameters<typeof t>[0];

  const renderError = (error: string | undefined | any) => {
    if (!error || typeof error !== 'string') return null;
    return <small>{t(error as TranslationKey)}</small>;
  };
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const initialValues: UserInput = {
    name: { firstname: '', lastname: '' },
    username: '',
    email: '',
    password: '',
    phone: '',
  };
  const onSubmit = async (
    values: UserInput,
    helpers: FormikHelpers<UserInput>,
  ) => {
    setFeedback(null);
    try {
      await dispatch(createUser(values)).unwrap();
      setFeedback({ type: 'success', text: t('successUser') });
      helpers.resetForm();
      setTimeout(() => navigate(ROUTES.users), 1100);
    } catch {
      setFeedback({ type: 'error', text: t('failed') });
    }
  };
  return (
    <>
      <PageTitle>
        <div>
          <h1>{t('createUser')}</h1>
          <p>{t('usersSubtitle')}</p>
        </div>
        <Button $variant="secondary" onClick={() => navigate(ROUTES.users)}>
          <ArrowRight size={16} />
          {t('cancel')}
        </Button>
      </PageTitle>
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <FormGrid>
              <Field>
                <label htmlFor="name.firstname">{t('firstName')}</label>
                <Input
                  id="name.firstname"
                  name="name.firstname"
                  value={values.name.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name?.firstname && renderError(errors.name?.firstname)}
              </Field>
              <Field>
                <label htmlFor="name.lastname">{t('lastName')}</label>
                <Input
                  id="name.lastname"
                  name="name.lastname"
                  value={values.name.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name?.lastname && renderError(errors.name?.lastname)}
              </Field>
              <Field>
                <label htmlFor="username">{t('username')}</label>
                <Input
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && renderError(errors.username)}
              </Field>
              <Field>
                <label htmlFor="email">{t('email')}</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && renderError(errors.email)}
              </Field>
              <Field>
                <label htmlFor="password">{t('password')}</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && renderError(errors.password)}
              </Field>
              <Field>
                <label htmlFor="phone">{t('phone')}</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phone && renderError(errors.phone)}
              </Field>
              {feedback && (
                <div style={{ gridColumn: '1/-1' }}>
                  <Alert $type={feedback.type}>{feedback.text}</Alert>
                </div>
              )}
              <div className="footer">
                <Button
                  type="button"
                  $variant="secondary"
                  onClick={() => navigate(ROUTES.users)}
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t('loading')
                  ) : (
                    <>
                      <BadgeCheck size={16} />
                      {t('save')}
                    </>
                  )}
                </Button>
              </div>
            </FormGrid>
          )}
        </Formik>
      </Card>
    </>
  );
}

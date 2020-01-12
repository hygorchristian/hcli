const mensagemFormik =
`
import validationSchema from './validationSchema';
import initialValues from './initialValues';

const onSubmit = () => {};

const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema
});
`

module.exports = {
  mensagemFormik
}

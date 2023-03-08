'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
	formSubmit: (user1: string, user2: string) => void;
};

export const FormComponent = ({ formSubmit }: Props) => {
	return (
		<Formik
			initialValues={{ user1: '', user2: '' }}
			validationSchema={Yup.object({
				user1: Yup.string()
					.max(32, 'Must be 32 characters or less')
					.required('Required'),
				user2: Yup.string()
					.max(32, 'Must be 32 characters or less')
					.required('Required'),
			})}
			onSubmit={values => formSubmit(values.user1, values.user2)}
		>
			<div className='flex justify-center align-center'>
				<Form className='flex align-center flex-col w-1/3 gap-4 text-red-400'>
					<Field
						name='user1'
						type='text'
						placeholder='User 1'
						className='p-2 bg-[rgb(21,31,46)] rounded text-white'
					/>
					<ErrorMessage name='user1' />
					<Field
						name='user2'
						type='text'
						placeholder='User 2'
						className='p-2 bg-[rgb(21,31,46)] rounded text-white'
					/>
					<ErrorMessage name='user2' />
					<button type='submit' className='text-white hover:text-blue-400'>
						Submit
					</button>
				</Form>
			</div>
		</Formik>
	);
};

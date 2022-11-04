import React from "react";
import { Editor } from '@tinymce/tinymce-react';
// import {Editor, EditorState} from 'draft-js'

function InputTextAreaEditor(props) {
	const { label, name, placeholder, type, onChange, value } = props;
	return (
		<>
			<label htmlFor="">{label}</label>	
				<Editor
					apiKey="kh7ug0wi0f85nanrf0kqcbg5pp5eutdr4m77u1vypgaw3cma"
					initialValue={value}
					name={name}
					init={{
					height: 300,
					menubar: true,
					plugins: [
						'advlist autolink lists link image',
						'charmap print preview anchor help',
						'searchreplace visualblocks code',
						'insertdatetime media table paste wordcount'
					],
					toolbar:
						'undo redo | formatselect | bold italic | \
						alignleft aligncenter alignright | \
						bullist numlist outdent indent | help'
					}}
					onEditorChange={onChange}
				/>

		</>
	);
}
export default InputTextAreaEditor;

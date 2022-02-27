/* eslint-disable no-var */
import React, { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
}

const WorkshopEditor: FC<Props> = () => {
	const editorRef = useRef<any>(null);
	const log = () => {
		if (editorRef.current) {
			// editorRef.current.
			console.log(editorRef.current.getContent());
		}
	};
	return (
		<>
			<Editor
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue="<p>This is the initial content of the editor.</p>"
				onSaveContent={() => console.log('hello')}
				init={{
					height: '100%',
					menu: {
						file: { title: 'File', items: 'newdocument restoredraft | preview | print | basicitem ' },
						edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
						view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
						insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
						format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
						tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
						table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
						help: { title: 'Help', items: 'help' }
					},
					menubar: true,
					plugins: [
						'save advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount'
					],
					toolbar: 'save undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					content_css: 'document',
					setup(editor) {
						editor.ui.registry.addMenuItem('basicitem', {
							text: 'Save',
							onAction: function () {
								alert('Menu item clicked');
								console.log(editor.save())
							}
						});
					}
				}}
			/>
		</>
	);
}

export default WorkshopEditor
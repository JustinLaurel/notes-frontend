import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as EditorType } from 'tinymce/tinymce';

import 'tinymce/tinymce';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/help';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/save';
import 'tinymce/plugins/importcss';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/themes/silver';
import { useToast } from '@chakra-ui/react';
import padService from '../../services/padService';
import { getPad } from '../../state/reducers/pad';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { isPad } from '../../validators/padValidators';
import { padToasts } from '../../utils/toasts/pad';
import { getStoredToken } from '../../state/reducers/login';

const Pad = () => {
    const token = useSelector((state: RootState) => state.login);
    const toast = useToast();

    useEffect(() => {
        if (Object.keys(token).length !== 0) {
            new Promise((resolve) => {
                const fetched = getPad();
                resolve(fetched);
            }).then(value => {
                if (isPad(value)) {
                    editorRef.current?.setContent(value.content);
                }
            }).catch((e) => {
                console.error(`Failed to retrieve pad content: ${(e as Error).message}`);
                toast(padToasts.error);
            });    
        } else {
            editorRef.current?.setContent('');
        }
    }, [token]);

    const handleEditorChange = () => {
        console.log(`Content was updated: ${editorRef.current?.getContent()}`);
    };

    const editorStyle = {
        "display": "flex",
        "flexDirection": "column",
        "mt": 2,
    };

    const saveNote = async () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            await padService.update(content);
        }
    };
    const editorRef: React.MutableRefObject<EditorType | null> = useRef(null);

    const editor = (
        <Editor
            onInit={(_evt, editor) => { editorRef.current = editor; }}
            init={{
                skin: false,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image',
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code importcss',
                    'insertdatetime media table save',
                ],
                statusbar: false,
                toolbar:
                    'undo redo | bold italic |\
                    underline strikethrough | superscript subscript charmap code |\
                    alignleft aligncenter alignright alignjustify |\
                    bullist numlist outdent indent | blockquote |\
                    link image media table | forecolor backcolor |\
                    removeformat fontsizeselect | fontselect | save | help',
                toolbar_mode: 'wrap',
                contextmenu: false,
                width: 'min(99%, 112.5rem)',
                height: 'min(56rem, 64rem)',
                branding: false,
                image_caption: false,
                forced_root_block: 'p',
                save_onsavecallback: saveNote,
            }}
            onChange={handleEditorChange} />);

    return (
        <div {...editorStyle}>
            {getStoredToken() ? editor : null}
        </div>
    );
};

export default Pad;
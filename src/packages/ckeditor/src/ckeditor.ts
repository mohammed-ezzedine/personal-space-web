/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import {
	Bold,
	Code,
	Italic,
	Strikethrough,
	Subscript,
	Superscript,
	Underline
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading, Title } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import {
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import {
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import { WordCount } from '@ckeditor/ckeditor5-word-count';

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoImage,
		AutoLink,
		Autoformat,
		BlockQuote,
		Bold,
		CloudServices,
		Code,
		CodeBlock,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		Highlight,
		HorizontalLine,
		Image,
		ImageCaption,
		ImageInsert,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		MediaEmbed,
		Mention,
		Paragraph,
		PasteFromOffice,
		RemoveFormat,
		SelectAll,
		ShowBlocks,
		SourceEditing,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		Strikethrough,
		Style,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		Title,
		TodoList,
		Underline,
		Undo,
		WordCount
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'fontFamily',
				'fontSize',
				'|',
				'bold',
				'italic',
				'link',
				'strikethrough',
				'underline',
				'fontColor',
				'fontBackgroundColor',
				'highlight',
				'bulletedList',
				'todoList',
				'numberedList',
				'subscript',
				'superscript',
				'|',
				'alignment',
				'outdent',
				'indent',
				'|',
				'findAndReplace',
				'|',
				'horizontalLine',
				'imageInsert',
				'blockQuote',
				'code',
				'codeBlock',
				'insertTable',
				'mediaEmbed',
				'removeFormat',
				'sourceEditing',
				'specialCharacters',
				'style'
			]
		},
		language: 'en',
		codeBlock: {
			languages: [
				{ language: 'bash', label: 'Bash' },
				{ language: 'c', label: 'C'},
				{ language: 'cpp', label: 'C++' },
				{ language: 'csharp', label: 'C#' },
				{ language: 'cmake', label: 'CMake' },
				{ language: 'css', label: 'CSS' },
				{ language: 'csv', label: 'CSV' },
				{ language: 'docker', label: 'Docker' },
				{ language: 'git', label: 'GIT' },
				{ language: 'go', label: 'Go' },
				{ language: 'gradle', label: 'Gradle' },
				{ language: 'graphql', label: 'GraphQL' },
				{ language: 'groovy', label: 'Groovy' },
				{ language: 'http', label: 'HTTP' },
				{ language: '.ignore', label: 'ignore', class: 'language-ignore' },
				{ language: 'java', label: 'Java' },
				{ language: 'javastacktrace', label: 'JavaStacktrace' },
				{ language: 'javascript', label: 'Javascript' },
				{ language: 'json', label: 'JSON' },
				{ language: 'kotlin', label: 'Kotlin' },
				{ language: 'markdown', label: 'Markdown' },
				{ language: 'mongodb', label: 'MongoDB' },
				{ language: 'nginx', label: 'nginx' },
				{ language: 'powershell', label: 'Powershell' },
				{ language: '.properties', label: 'properties', class: 'language-properties' },
				{ language: 'protobuf', label: 'Protobuf' },
				{ language: 'plaintext', label: 'plaintext' },
				{ language: 'python', label: 'Python' },
				{ language: 'regex', label: 'RegEx' },
				{ language: 'sass', label: 'SASS' },
				{ language: 'scss', label: 'SCSS' },
				{ language: 'sql', label: 'SQL' },
				{ language: 'typescript', label: 'Typescript' },
				{ language: 'yaml', label: 'YAML' },
				{ language: 'xml', label: 'XML', class: 'language-xml-doc' }
			]
		},
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'linkImage'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties'
			]
		}
	};
}

export default { Editor, EditorWatchdog };

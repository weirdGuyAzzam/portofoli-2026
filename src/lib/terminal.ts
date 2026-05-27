import { createTextField } from '@melt-ui/svelte';
import type { TextFieldEvents } from '@melt-ui/svelte';

export interface CommandInputProps {
	placeholder?: string;
	value?: string;
	onSubmit?: (value: string) => void;
}

export function createCommandInput({ onSubmit }: CommandInputProps = {}) {
	const { ...rest } = createTextField({
		id: 'command-input',
		autocomplete: 'off',
		spellcheck: false,
		label: 'Terminal command input',
		onKeyDown: (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
			if (e.key === 'Enter' && onSubmit) {
				e.preventDefault();
				onSubmit(e.currentTarget.value);
				e.currentTarget.value = '';
			}
		}
	});

	return {
		...rest,
		props: {
			...rest.props,
			class: 'w-full bg-transparent outline-none text-green-400 placeholder-green-700/50 caret-green-400 font-mono text-sm',
			placeholder: 'Type a command (type "help" for options)...'
		}
	};
}

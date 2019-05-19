import {ReactElement} from 'react';
import { NOOP } from '../../util';

export interface EditorListProps<T> {
    items: T[]
    activeItem?: T
    onSelect: (item: T) => void
    renderEditor: (item?: T) => ReactElement
    keyExtractor: (item: T) => string
    titleExtractor: (item: T) => string
    onFilter?: (filter: string) => void
    addItem?: () => void
}
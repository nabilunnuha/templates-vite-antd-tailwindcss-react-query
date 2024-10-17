import { Children, ReactNode } from 'react';

export interface EachUtilsProps<T> {
    dataSource: T[];
    render: (item: T, index: number) => ReactNode;
}

const EachUtils = <T,>({ dataSource, render }: EachUtilsProps<T>) => {
    return Children.toArray(dataSource.map((item, index) => render(item, index)))
}

export default EachUtils
import { ReactNode } from 'react';
import { RootHydration } from '../store/rootStore';

export interface RootContextProps {
    children: ReactNode;
    hydrationData?: RootHydration;
}
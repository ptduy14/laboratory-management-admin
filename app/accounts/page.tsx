import React from 'react';
import {Accounts} from '@/components/accounts';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Accounts",
   description: "Laboratory management for CTUT Lab",
}

const accounts = () => {
   return <Accounts />;
};

export default accounts;

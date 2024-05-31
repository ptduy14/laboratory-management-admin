import React from "react";
import { Resources } from "@/components/resoures";
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Resources",
   description: "Laboratory management for CTUT Lab",
}

const resources = () => {
    return <Resources />
}

export default resources;
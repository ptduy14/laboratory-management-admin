import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardTool = () => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Dụng cụ</span>
            <span className="text-default-900 text-xs">Hiện có: 20 dụng cụ</span>
          </div>
        </div>
        <div className="gap-2.5 py-2 items-center">
          <span className="block text-default-900 text-xl font-semibold">
            Đã bàn giao
          </span>
          <span className="block text-default-900 text-xl font-semibold">
            1 dụng cụ
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

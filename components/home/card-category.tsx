import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardCategory = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Hóa chất</span>
            <span className="text-white text-xs">Hiện có: 11 hóa chất</span>
          </div>
        </div>
        <div className="gap-2.5 py-2 items-center">
          <span className="block text-white text-xl font-semibold">Đã bàn giao</span>
          <span className="text-white text-xl font-semibold">4 hóa chất</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↓"}</span>
              <span className="text-xs">100,930</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">4,120</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">125</span>
            </div>
            <span className="text-white text-xs">VIP</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

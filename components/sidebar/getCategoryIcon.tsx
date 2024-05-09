import { ChemicalIcon } from "@/components/icons/chemical-icon";
import { ToolIcon } from "@/components/icons/tool-icons";
import { EquipmentIcon } from "@/components/icons/equiptment-icon";

export const getCategoryIcon = (categoryId: number) => {
    switch (categoryId) {
        case 1:
          return <EquipmentIcon />;
        case 2:
          return <ToolIcon />;
        case 3:
          return <ChemicalIcon />;
        default:
          return null; // Trả về null nếu không có biểu tượng tương ứng
      }
}
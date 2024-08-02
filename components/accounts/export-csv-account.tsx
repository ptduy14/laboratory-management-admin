import { Button } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import useSWR from "swr";
import { Account } from "./account-table/data";
import { RoleNames } from "@/enums/role";
import { AccountStatusNames } from "@/enums/account-status";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { accountsFetcher } from "@/utils/fetchers/account-fetchers.ts/accountsFetcher";

export const ExportCSVAccount = () => {
  const { data: accounts, isLoading } = useSWR(`/users/get`, (url) =>
    accountsFetcher(url, { take: 50 })
  );

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Tên,Họ,Địa chỉ,Avata, Email, Trạng thái, Vai trò\n" +
      accounts.data
        .map(
          (account: Account) =>
            `"${account.firstName}", "${account.lastName}", "${account.address}", "${
              account.photo
            }", "${account.email}", "${AccountStatusNames[account.status]}", "${
              RoleNames[account.role]
            }"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `account_list_${getCurrentDate()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoading) return <></>;

  return (
    <Button color="primary" startContent={<ExportIcon />} onClick={handleDownloadCSV}>
      Export to CSV
    </Button>
  );
};

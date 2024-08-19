import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type Props = {
    account: string | null;
    accountId: string;
};

export const AccountColumn = ({ account, accountId }: Props) => {
    const { onOpen } = useOpenAccount();
    const onClick = () => {
        onOpen(accountId);
    };
    return <div className="hover:underline cursor-pointer" onClick={onClick}>{account}</div>;
};

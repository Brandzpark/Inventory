import PasswordReset from "@/components/PasswordReset/PasswordReset";

type Props = {
  params: { token: string };
};

export default function page({ params }: Props) {
  const { token } = params;
  return <PasswordReset token={token} />;
}

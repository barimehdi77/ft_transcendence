import Head from "next/head";
import Invite from "../components/invite";
import { useRouter } from "next/router";
const InvitePage = () => {
    const rt = useRouter();

    const { img, sender, name } = rt;
  return <Invite name={rt.query.name} img={rt.query.img} sender={rt.query.sender} />;
};

export default InvitePage;

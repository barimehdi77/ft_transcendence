import { IMembers } from "../typings";

export const getMember = (intra_id: number, members: IMembers[]) => {
    return members.find((member) => member.intra_id !== intra_id);
}
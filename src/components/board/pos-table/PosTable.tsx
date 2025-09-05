import BasePosTable from "@/components/board/pos-table/BasePosTable";
import SupportPosTable from "@/components/board/pos-table/SupportPosTable";
import MysteryPosTable from "@/components/board/pos-table/MysteryPosTable";
import { PosGeneral, ParseTreeStats, TagStats } from "spell-spells-schema";

interface PosTableProps {
    className: string;
    stats: ParseTreeStats | null;
    basePos?: PosGeneral[];
    supportPos?: PosGeneral[];
    mysteryPos?: PosGeneral[];
    hidden?: PosGeneral[];
}

export default function PosTable({
    className,
    stats,
    basePos = [
        PosGeneral.Noun,
        PosGeneral.Adjective,
        PosGeneral.Verb,
        PosGeneral.Adverb,
    ],
    supportPos = [PosGeneral.Determiner, PosGeneral.Conjunction],
    mysteryPos = [PosGeneral.Invalid],
}: /*
    hidden = [
        PosGeneral.Number,
        PosGeneral.Existential,
        PosGeneral.Modal,
        PosGeneral.Possessive,
        PosGeneral.Particle,
        PosGeneral.Infinitive,
        PosGeneral.Interjection,
    ],
    */
PosTableProps) {
    if (!stats) {
        return <div className={`${className}`}>Your table appears here!</div>;
    }
    const genTags: Record<PosGeneral, TagStats> = stats.posGeneralTags;
    const entries = Object.entries(genTags) as unknown as [
        PosGeneral,
        TagStats
    ][];

    // getting base entries
    const baseEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && basePos.includes(entry[0])
    );
    const baseRecord: Record<PosGeneral, number> = {} as Record<
        PosGeneral,
        number
    >;
    baseEntries.forEach((tup) => (baseRecord[tup[0]] = tup[1].amount));

    // getting support entries
    const supportEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && supportPos.includes(entry[0])
    );
    const supportRecord: Record<PosGeneral, number> = {} as Record<
        PosGeneral,
        number
    >;
    supportEntries.forEach(
        ([pos, { amount }]) => (supportRecord[pos] = amount)
    );

    // getting mystery entries
    const mysteryEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && mysteryPos.includes(entry[0])
    );
    const mysteryRecord: Record<PosGeneral, number> = {} as Record<
        PosGeneral,
        number
    >;
    mysteryEntries.forEach(
        ([pos, { amount }]) => (mysteryRecord[pos] = amount)
    );

    /*
    const hiddenEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && hidden.includes(entry[0])
    );
    const hiddenEntriesCount = hiddenEntries
        .map((entry) => entry[1].amount)
        .reduce((acc, cur) => acc + cur, 0);
    */

    return (
        <div className={`${className} flex flex-col justify-center`}>
            <BasePosTable className="" counts={baseRecord}></BasePosTable>
            <SupportPosTable counts={supportRecord}></SupportPosTable>
            <MysteryPosTable counts={mysteryRecord}></MysteryPosTable>
        </div>
    );
}

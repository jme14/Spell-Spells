import ParseTreeStats from "@/types/nlp/ParseTreeStats";
import { PosGeneral } from "@/types/nlp/PosGeneral";
import TagStats from "@/types/nlp/TagStats";
interface PosTableProps {
    stats: ParseTreeStats | null;
    shown?: PosGeneral[];
    hidden?: PosGeneral[];
}

export default function PosTable({
    stats,
    shown = [
        PosGeneral.Noun,
        PosGeneral.Adjective,
        PosGeneral.Verb,
        PosGeneral.Adverb,
        PosGeneral.Determiner,
        PosGeneral.Conjunction,
        PosGeneral.Invalid,
    ],
    hidden = [
        PosGeneral.Number,
        PosGeneral.Existential,
        PosGeneral.Modal,
        PosGeneral.Possessive,
        PosGeneral.Particle,
        PosGeneral.Infinitive,
        PosGeneral.Interjection,
    ],
}: PosTableProps) {
    if (!stats) {
        return <div>Your table appears here!</div>;
    }
    const genTags: Record<PosGeneral, TagStats> = stats.posGeneralTags;
    const entries = Object.entries(genTags) as unknown as [
        PosGeneral,
        TagStats
    ][];
    const shownEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && shown.includes(entry[0])
    );
    const hiddenEntries = entries.filter(
        (entry) => entry[0] in PosGeneral && hidden.includes(entry[0])
    );

    const hiddenEntriesCount = hiddenEntries
        .map((entry) => entry[1].amount)
        .reduce((acc, cur) => acc + cur, 0);

    return (
        <div className="pt-4">
            <table className="border">
                <tbody>
                    {shownEntries.map(([key, value]) => (
                        <tr key={key} className="border-b last:border-0">
                            <th className="px-4 py-2 font-medium bg-gray-50 w-1/3">
                                {key}
                            </th>
                            <td className="px-4 py-2">{value.amount}</td>
                        </tr>
                    ))}
                    <tr key={-1} className="border-b last:border-0">
                        <th className="px-4 py-2 font-medium bg-gray-50 w-1/3">
                            Hidden
                        </th>
                        <td className="px-4 py-2">{hiddenEntriesCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

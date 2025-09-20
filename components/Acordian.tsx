import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faq from "@/data/faq.json";
export default function Acordian() {
  return (
    <Accordion type="multiple" className="w-full">
      {faq.map((f, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{f.question}</AccordionTrigger>
          <AccordionContent>{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

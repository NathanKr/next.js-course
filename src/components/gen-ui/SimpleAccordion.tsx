import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC } from "react";

export interface ISimpleAccordionItem {
  summary: string;
  details: string;
}

interface IProps {
  items: ISimpleAccordionItem[];
}

const SimpleAccordion: FC<IProps> = ({ items }) => {
  const elems = items.map((it, i) => (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{it.summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{it.details}</Typography>
      </AccordionDetails>
    </Accordion>
  ));

  return <div>{elems}</div>;
};

export default SimpleAccordion;

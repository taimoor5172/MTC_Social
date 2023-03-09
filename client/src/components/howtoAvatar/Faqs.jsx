import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Customized Avatars
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            How to create customized Avatars{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Video Background - ensure you have a distinct uncluttered background
            Camera - use a high quality camera. Framing - position the camera at
            eye height and frame the upper body. Lighting - keep the actor well
            lit with no shadows. Audio - make sure to have clear audio for the
            actor only. Color - provide image with the look you would like for
            your avatar. Wardrobe - keep hair behind the head and avoid seeing
            background through hair. Performance - the presenter should stay
            relaxed, smiling, calm, keep hands clasped with NO obvious gestures.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Voice Cloning
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            How to record audio for Voice Cloning
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We use audio to train our AI algorithms to match the lip movement
            for the actor. Keep background noise to a minimum. Make sure only
            the actor speaks.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            What is Custom Avatar
          </Typography>
          <Typography sx={{ color: "text.secondary" }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Mtc custom avatar is a digital, but photo-realistic representation
            of a human. These custom avatars can be used to create business
            videos. You can create a custom avatar of yourself.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}

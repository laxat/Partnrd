import React from "react";
import { useHistory } from "react-router-dom";
import SLUGS from "../../resources/slugs";
import { convertSlugUrl } from "../../resources/utils";
import LogoComponent from "./Logo";
import Menu from "./MenuComponent";
import MenuItem from "./MenuItem";
import { GrDocument } from "react-icons/gr";
import {ImLifebuoy } from "react-icons/im";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { GiScales } from "react-icons/gi";
import { VscSettingsGear } from "react-icons/vsc";

function SidebarComponent() {
  const { push } = useHistory();

  const isMobile = window.innerWidth <= 1080;

  function onClick(slug, parameters = {}) {
    push(convertSlugUrl(slug, parameters));
  }

  return (
    <Menu isMobile={isMobile}>
      <div style={{ paddingTop: 18, paddingBottom: 10 }}>
        <LogoComponent />
      </div>
      <MenuItem
        id={SLUGS.agreements}
        title="Agreements"
        icon={GrDocument}
        onClick={() => onClick(SLUGS.agreements)}
      />
      {/* <MenuItem
        id={SLUGS.templates}
        title="Templates"
        icon={ImInsertTemplate}
        onClick={() => onClick(SLUGS.templates)}
      /> */}
      <MenuItem
        id={SLUGS.lawyers}
        title="Lawyers"
        icon={GiScales}
        onClick={() => onClick(SLUGS.lawyers)}
      />
      <MenuItem
        id={SLUGS.supportTickets}
        title="Support Tickets"
        icon={ImLifebuoy}
        onClick={() => onClick(SLUGS.supportTickets)}
      />
      <MenuItem
        //id={SLUGS.settings}
        items={[
          SLUGS.profileSettings,
          SLUGS.companySettings,
          SLUGS.subscriptions,
          SLUGS.invoices,
        ]}
        title="Settings"
        icon={VscSettingsGear}
      >
        <MenuItem
          id={SLUGS.profileSettings}
          title="Profile Settings"
          icon={PermIdentityIcon}
          onClick={() => onClick(SLUGS.profileSettings)}
        />

        <MenuItem
          id={SLUGS.companySettings}
          title="Company Settings"
          icon={EmojiTransportationIcon}
          onClick={() => onClick(SLUGS.companySettings)}
        />

        <MenuItem
          id={SLUGS.subscriptions}
          title="Subscriptions"
          icon={RotateLeftIcon}
          onClick={() => onClick(SLUGS.subscriptions)}
        />

        <MenuItem
          id={SLUGS.invoices}
          title="Invoices"
          icon={ClearAllIcon}
          onClick={() => onClick(SLUGS.invoices)}
        />
      </MenuItem>
    </Menu>
  );
}

export default SidebarComponent;

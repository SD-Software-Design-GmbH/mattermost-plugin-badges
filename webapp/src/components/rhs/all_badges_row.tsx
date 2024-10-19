import React from "react";

import { AllBadgesBadge } from "../../types/badges";
import BadgeImage from "../utils/badge_image";
import { markdown } from "utils/markdown";

import "./all_badges_row.scss";

type Props = {
  badge: AllBadgesBadge;
  onClick: (badge: AllBadgesBadge) => void;
};

function getGrantedText(badge: AllBadgesBadge): string {
  if (badge.granted === 0) {
    return "Noch nicht vergeben.";
  }
  if (badge.multiple) {
    return `${badge.granted_times}x vergeben an ${badge.granted} Mitarbeitende.`;
  }

  return `Vergeben an ${badge.granted} Mitarbeitende.`;
}

const AllBadgesRow: React.FC<Props> = ({ badge, onClick }: Props) => {
  return (
    <div className="AllBadgesRow">
      <a className="badge-icon" onClick={() => onClick(badge)}>
        <span>
          <BadgeImage badge={badge} size={32} />
        </span>
      </a>
      <div>
        <div className="badge-name">{badge.name}</div>
        <div className="badge-description">{markdown(badge.description)}</div>
        <div className="badge-type">{"Type: " + badge.type_name}</div>
        <div className="granted-by">{getGrantedText(badge)}</div>
      </div>
    </div>
  );
};

export default AllBadgesRow;

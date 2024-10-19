import React from "react";

import Client4 from "mattermost-redux/client/client4";

import { UserBadge } from "../../types/badges";
import BadgeImage from "../utils/badge_image";
import { markdown } from "utils/markdown";

import "./user_badge_row.scss";

type Props = {
  badge: UserBadge;
  isCurrentUser: boolean;
  onClick: (badge: UserBadge) => void;
};

const UserBadgeRow: React.FC<Props> = ({
  badge,
  onClick,
  isCurrentUser,
}: Props) => {
  const time = new Date(badge.time);
  let reason = null;
  if (badge.reason) {
    reason = <div className="badge-user-reason">{"Why? " + badge.reason}</div>;
  }
  let setStatus = null;
  if (isCurrentUser && badge.image_type === "emoji") {
    setStatus = (
      <div className="user-badge-set-status">
        <a
          onClick={() => {
            const c = new Client4();
            c.updateCustomStatus({ emoji: badge.image, text: badge.name });
          }}
        >
          {"Als Status setzen"}
        </a>
      </div>
    );
  }
  return (
    <div className="UserBadgesRow">
      <a onClick={() => onClick(badge)}>
        <span className="user-badge-icon">
          <BadgeImage badge={badge} size={32} />
        </span>
      </a>
      <div className="user-badge-text">
        <div className="user-badge-name">{badge.name}</div>
        <div className="user-badge-description">
          {markdown(badge.description)}
        </div>
        {reason}
        <div className="user-badge-type">{"Typ: " + badge.type_name}</div>
        <div className="user-badge-granted-at">{`Erhalten: ${time.toDateString()}`}</div>
        {setStatus}
      </div>
    </div>
  );
};

export default UserBadgeRow;

import React from "react";

import { systemEmojis } from "mattermost-redux/actions/emojis";

import { BadgeID, AllBadgesBadge } from "../../types/badges";
import Client from "../../client/api";

import { RHSState } from "../../types/general";
import { IMAGE_TYPE_EMOJI, RHS_STATE_DETAIL } from "../../constants";

import AllBadgesRow from "./all_badges_row";
import RHSScrollbars from "./rhs_scrollbars";

import "./all_badges.scss";

type Props = {
  actions: {
    setRHSView: (view: RHSState) => void;
    setRHSBadge: (badge: BadgeID | null) => void;
    getCustomEmojisByName: (names: string[]) => void;
  };
};

type State = {
  loading: boolean;
  badges?: AllBadgesBadge[];
};

class AllBadges extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const c = new Client();
    c.getAllBadges().then((badges) => {
      this.setState({ badges, loading: false });
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.badges !== prevState.badges) {
      const names: string[] = [];
      this.state.badges?.forEach((badge) => {
        if (badge.image_type === IMAGE_TYPE_EMOJI) {
          names.push(badge.image);
        }
      });
      const toLoad = names.filter((v) => !systemEmojis.has(v));
      this.props.actions.getCustomEmojisByName(toLoad);
    }
  }

  onBadgeClick = (badge: AllBadgesBadge) => {
    this.props.actions.setRHSBadge(badge.id);
    this.props.actions.setRHSView(RHS_STATE_DETAIL);
  };

  render() {
    if (this.state.loading) {
      return <div className="AllBadges">{"Lade..."}</div>;
    }

    if (!this.state.badges || this.state.badges.length === 0) {
      return <div className="AllBadges">{"Noch keine Auszeichnungen."}</div>;
    }

    const content = this.state.badges.map((badge) => {
      return (
        <AllBadgesRow
          key={badge.id}
          badge={badge}
          onClick={this.onBadgeClick}
        />
      );
    });
    return (
      <div className="AllBadges">
        <div>
          <b>{"Alle verfügbaren Auszeichnungen"}</b>
        </div>
        <RHSScrollbars>{content}</RHSScrollbars>
      </div>
    );
  }
}

export default AllBadges;

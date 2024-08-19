import { Component, Fragment } from "comer";
import { Div, styled } from "comer-dom";
import { ElementTreeModel, ElementTreeNode } from "./ElementTreeModel";
import { Icon } from "../components/Icon";
import { Label } from "../components/Label";

const TreeNodeWrapper = styled(Div, {
  cursor: "default",
  userSelect: "none",
});

const TreeNodeTitleWrapper = styled(Div, {
  padding: "2px 6px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#eee",
  },
});

const TreeNodeIconWrapper = styled(Icon, {
  fontSize: "10px",
  verticalAlign: "middle",
  fontWeight: "bold",
});

const TreeNodeLabeWrapper = styled(Label, {
  padding: "0 2px",
  margin: "0 2px",
  verticalAlign: "middle",
  textTransform: "capitalize",
});

const TreeNodeChildrenWrapper = styled(Div, {
  padding: "0 0 0 14px",
});

export type ElementTreeNodeViewProps = {
  model: ElementTreeModel;
  node: ElementTreeNode;
};

class TreeChildren extends Component<ElementTreeNodeViewProps> {
  build(): Component {
    const { node, model } = this.props;
    const children = node.expanded
      ? node.children?.map((it) => new ElementTreeNodeView({ model, node: it }))
      : [];
    if (!children || children.length < 1) return new Fragment();
    return new TreeNodeChildrenWrapper({ children });
  }
}

class TreeTitle extends Component<ElementTreeNodeViewProps> {
  toggleExpandState = () => {
    const { model, node } = this.props;
    model.toggleExpandState(node);
  };
  build(): Component {
    const { node } = this.props;
    const iconName =
      (node.children?.length || 0) < 1 || node.expanded
        ? "expanded"
        : "collapsed";
    return new TreeNodeTitleWrapper({
      onClick: this.toggleExpandState,
      children: [
        new TreeNodeIconWrapper({ name: iconName }),
        new TreeNodeLabeWrapper(node.title),
      ],
    });
  }
}

// const X = styled(TreeTitle, {});

export class ElementTreeNodeView extends Component<ElementTreeNodeViewProps> {
  build(): Component {
    const { model, node } = this.props;
    return new TreeNodeWrapper({
      children: [
        new TreeTitle({ model, node }),
        new TreeChildren({ model, node }),
      ],
    });
  }
}

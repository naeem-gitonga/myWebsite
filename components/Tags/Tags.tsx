import styles from './Tags.module.scss';

type TagsProps = {
  tags: string[];
};
export default function Tags(props: TagsProps): JSX.Element {
  const { tagWrapper } = styles;
  const tags = props.tags.map((t) => <div className={tagWrapper}>{t}</div>);
  return <div>{tags}</div>;
}

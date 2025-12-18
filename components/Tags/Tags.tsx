import styles from './Tags.module.scss';

type TagsProps = {
  tags: string[];
};
export default function Tags(props: TagsProps): React.JSX.Element {
  const { tagWrapper } = styles;
  const tags = props.tags.map((t: string, i) => (
    <div key={`${t}-${i}`} className={tagWrapper}>
      {t}
    </div>
  ));
  return <div>{tags}</div>;
}

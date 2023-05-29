import Footer from '@/components/Footer/Footer';
import '../globals.css';

export default function Blog(): JSX.Element {
  return (
    <div>
      <p className="textAlign">
        Coming Soon! My plans are to host my own articles here first versus where they currently are, <a href="https://naeemgtng.medium.com/" target="_blank">Medium</a>.
      </p>
      <div className="construction" />
      <Footer />
    </div>
  );
}

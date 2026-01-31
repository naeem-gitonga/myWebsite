import styles from '@/components/Articles/Articles.module.scss';

export default function ExampleRagServiceTable(): React.JSX.Element {
  const { table } = styles;

  return (
    <table className={table}>
      <thead>
        <tr>
          <th>Local service</th>
          <th>Responsibility</th>
          <th>AWS equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Gateway</strong>
          </td>
          <td>WebSocket connections + local “Lambda” invocations</td>
          <td>API Gateway</td>
        </tr>
        <tr>
          <td>
            <strong>Ingestion</strong>
          </td>
          <td>Process documents, store embeddings</td>
          <td>Lambda</td>
        </tr>
        <tr>
          <td>
            <strong>Chat</strong>
          </td>
          <td>RAG retrieval + message persistence</td>
          <td>Lambda</td>
        </tr>
        <tr>
          <td>
            <strong>Embedding</strong>
          </td>
          <td>Text → vectors</td>
          <td>Bedrock</td>
        </tr>
        <tr>
          <td>
            <strong>LLM</strong>
          </td>
          <td>Response generation</td>
          <td>Bedrock</td>
        </tr>
        <tr>
          <td>
            <strong>LanceDB</strong>
          </td>
          <td>Vector store, backed by MinIO / S3‑style storage</td>
          <td>LanceDB with S3 backend</td>
        </tr>
      </tbody>
    </table>
  );
}

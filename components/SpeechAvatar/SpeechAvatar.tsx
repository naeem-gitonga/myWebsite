'use client';

import articleStyles from '../Articles/Articles.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';

type SpeechAvatarProps = {
  videoUrl?: string;
};

export default function SpeechAvatar({
  videoUrl = 'https://d2j3yisnywcb30.cloudfront.net/pix/careers_u_demo_compressed.mp4',
}: SpeechAvatarProps): React.JSX.Element {
  const { innerWrapper, imageWrapper, text } = articleStyles;
  const { width75 } = sharedStyles;

  return (
    <div className={`${width75} ${innerWrapper}`}>
      <h1>&ldquo;Real-time&rdquo; Conversational Speech Avatar</h1>
      <div className={imageWrapper}>
        <video
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          playsInline
          preload="metadata"
          onContextMenu={(event) => event.preventDefault()}
          aria-label="Speech avatar demo video"
          style={{ maxWidth: '100%' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className={text}>
        In this video, the application is running on an H100 x 8 GPU which costs about $50 per hour.
        With the correct configuration and compute, this can truly be real-time.
        You can see the logs in the video as the inference takes place.
      </p>

      <p className={text}>
        It took me two weeks to build this. And another week to get it deployed to
        the proper GPU configuration in the cloud. There were many learnings
        that took place during this process. I first started dev&apos;ing on an
        Nvidia DGX Spark.
      </p>

      <h2>Specs</h2>
      <p className={text}><strong>Speech-to-Text (STT)</strong></p>
      <ul>
        <li className={text}>Whisper Large v3 model</li>
        <li className={text}>~2GB GPU memory</li>
      </ul>

      <p className={text}><strong>Large Language Model (LLM)</strong></p>
      <ul>
        <li className={text}>Llama 3.2 3B Instruct</li>
        <li className={text}>~8GB GPU memory</li>
      </ul>

      <p className={text}><strong>Text-to-Speech (TTS)</strong></p>
      <ul>
        <li className={text}>F5-TTS model</li>
        <li className={text}>~2GB GPU memory</li>
      </ul>

      <p className={text}><strong>Audio-to-Talking-Video (ATTV)</strong></p>
      <ul>
        <li className={text}>LiveAvatar 14B parameter model</li>
        <li className={text}>~50GB GPU memory (with offloading)</li>
        <li className={text}>Multi-GPU tensor parallelism across 5 GPUs</li>
      </ul>

      <p className={text}><strong>WebSockets</strong></p>
      <ul>
        <li className={text}>Live video stream delivery to the client</li>
      </ul>

      <p className={text}><strong>gRPC</strong></p>
      <ul>
        <li className={text}>Inter-service communication between Speech-to-Text, Gateway, Audio-to-Talking-Video, and Text-to-Speech services</li>
      </ul>

    </div>
  );
}

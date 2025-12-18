import type { StaticImageData } from 'next/image';

import aiGeneratedImage from '@/components/pictures/ai-generated-image.png';
import awsIamImage from '@/components/pictures/aws-iam.jpeg';
import ckaImage from '@/components/pictures/cka.jpg';
import computerGeniusImage from '@/components/pictures/computer-genius.png';
import dockerNodeImage from '@/components/pictures/docker-node.png';
import dontPanicImage from '@/components/pictures/dont-panic.jpg';
import ec2LinuxImage from '@/components/pictures/ec2-linux.png';
import gitlabMirrorImage from '@/components/pictures/gitlab-mirror.png';
import jsNewImage from '@/components/pictures/js-new.png';
import kidsEatingSpaghettiImage from '@/components/pictures/kids-eating-spaghetti.png';
import reactContextImage from '@/components/pictures/react-context.png';
import samLambdaImage from '@/components/pictures/SAM-Golang-MongoDB.png';
import seeTheLightImage from '@/components/pictures/see-the-light.jpg';

type ArticleImage = StaticImageData | string;

export const articleTileImages: Record<string, ArticleImage> = {
  tigergroup: '/images/tiger-hero.jpg',
  aiimage: aiGeneratedImage,
  gitlabmirror: gitlabMirrorImage,
  exprapidbackend: seeTheLightImage,
  expcka: ckaImage,
  awsiam: awsIamImage,
  dontpanic: dontPanicImage,
  jsnew: jsNewImage,
  explservers: kidsEatingSpaghettiImage,
  samgolambda: samLambdaImage,
  xml: computerGeniusImage,
  mspt2: ec2LinuxImage,
  mspt1: dockerNodeImage,
  reactcontext: reactContextImage,
};

export const articleTileImageFallback = articleTileImages.reactcontext;

import type { LegacyRef, ReactNode } from 'react';

export interface PlayerState {
  /**
     * Returns the URL of the current video
     */
  currentSrc: string;
  /**
     * Returns the length of the current video (in seconds)
     */
  duration: number;
  /**
     * Returns the current playback position in the video (in seconds)
     */
  currentTime: number;
  /**
     * Returns the current seeking position in the video (in seconds)
     */
  seekingTime: number;
  /**
     * Returns a TimeRanges object representing the buffered parts of the video
     */
  buffered: Record<any, any>;
  /**
     * Returns whether the player needs to buffer the next frame
     */
  waiting: boolean;
  /**
     * Returns whether the user is currently seeking in the video
     */
  seeking: boolean;
  /**
     * Returns whether the player has been paused
     */
  paused: boolean;
  /**
     * Returns whether the player has been paused by the player itself
     */
  autoPaused: boolean;
  /**
     * Returns whether the playback of the video has ended or not
     */
  ended: boolean;
  /**
     * Returns the speed of the video playback
     */
  playbackRate: number;
  /**
     * Returns whether the video is muted or not
     */
  muted: boolean;
  /**
     * Returns the volume of the video.
     */
  volume: number;
  /**
     * Returns the current ready state of the video
     */
  readyState: number;
  /**
     * Returns the current network state of the video
     */
  networkState: number;
  /**
     * Returns the volume of the video
     */
  videoWidth: number;
  /**
     * Returns the height of the video
     */
  videoHeight: number;
  /**
     * Returns whether the video has been started
     */
  hasStarted: boolean;
  /**
     * Returns whether the user is in activity.
     */
  userActivity: boolean;
  /**
     * Returns whether the player is in activity.
     */
  isActive: boolean;
  /**
     * Returns whether the player is in fullscreen.
     */
  isFullscreen: boolean;
  /**
     * Set the id of the video element.
     */
  videoId: string;
}

export type StateListener = (current: PlayerState, previous: PlayerState) => void;

export interface StaticPlayerInstanceMethods {
  /**
     * Get the redux State.
     */
  getState: () => PlayerState;
  /**
     * Play the video.
     */
  play: () => void;
  /**
     * Pause the video.
     */
  pause: () => void;
  /**
     * Change the video source and re-load the video
     */
  load: () => void;
  /**
     * Add a new text track to the video
     */
  addTextTrack: () => void;
  /**
     * Check if your browser can play different types of videos
     */
  canPlayType: () => void;
  /**
     * Seek video by time (seconds)
     */
  seek: (time: number) => void;
  /**
     * Jump forward x seconds
     */
  forward: (seconds: number) => void;
  /**
     * Jump back x seconds
     */
  replay: (seconds: number) => void;
  /**
     * Enter or exist full screen
     */
  toggleFullscreen: () => void;
  /**
     * Subscribe to the player state changes.
     */
  subscribeToStateChange: (listener: StateListener) => void;
}

export type PlayerReference = HTMLVideoElement & StaticPlayerInstanceMethods;

export interface PlayerProps {
  ref?: LegacyRef<PlayerReference> | undefined;
  /**
     * In fluid mode, it’s 100% wide all the time, the height will be
     * calculated by the video's ratio.
     */
  fluid?: boolean;
  /**
     * The width value of video, could be an number or percent or auto.
     * (This attribute is effective only if you set fluid as false)
     */
  width?: number;
  /**
     * The height value of video, could be an number or percent or auto.
     * (This attribute is effective only if you set fluid as false)
     */
  height?: number;
  /**
     * The URL of the video to embed. This is optional; you may instead
     * use the <source> element within the Player block to specify the
     * video to embed.
     */
  src?: string;
  /**
     * A URL indicating a poster frame to show until the user plays or
     * seeks. If this attribute isn't specified, nothing is displayed
     * until the first frame is available; then the first frame is shown
     * as the poster frame.
     */
  poster?: string;
  /**
     * This enumerated attribute is intended to provide a hint to the
     * browser about what the author thinks will lead to the best user
     * experience. It may have one of the following values:
     *
     * - none: indicates that the video should not be preloaded.
     * - metadata: indicates that only video metadata should be preloaded.
     * - auto: indicates that both video and audio should be preloaded.
     * (even if the user is not interacting with the video)
     */
  preload?: 'none' | 'metadata' | 'auto';
  /**
     * A Boolean attribute which indicates the default setting of the audio
     * contained in the video. If set, the audio will be initially silenced.
     * Its default value is false, meaning that the audio will be played when
     * the video is played.
     */
  muted?: boolean;
  /**
     * [iOS only] Determines whether HTML5 videos play inline or use the native
     * full-screen controller.
     */
  playsInline?: boolean;
  /**
     * The aspect ratio is the width of the video divided by its height.
     * Possible values:
     *
     * - auto
     * - 16:9
     * - 4:3
     */
  aspectRatio?: string;
  /**
     * If specified, the video automatically begins to play back as soon as
     * it can do so without stopping to finish loading the data.
     */
  autoPlay?: boolean;

  /**
     * Seek the Video at A Specific Time On Load
     */
  startTime?: number;

  children?: ReactNode;
}

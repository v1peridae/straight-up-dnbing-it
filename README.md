# yubikey makes music!

- do you like dnb?
- do you own a yubikey?
#### try out [yubidnb](https://yubidnb.vercel.app/) :)

what if one of the villagers wants to listen to music and has a yubikey and maybe also wants to be a dj? they can use this!!!! 


### how does it work?
[here's](https://hc-cdn.hel1.your-objectstorage.com/s/v3/76971cd6c7e708c39776dbe1fcc34a8784910fc2_screen_recording_2025-10-02_at_22.13.11.mp4) a video for starters

1. you start here - you generate an otp in the input field.

2. seed generation - the otp string becomes the random seed for pattern generation. it's converted into a deterministic rng so the same seed produces the same beat.

3. creating the pattern - the seed generates drum patterns, sub-bass, stabs + fx using different algorithms:
   - drum patterns: created from hitmap data of drum breaks with two layers. 
   - sub-bass: follows the drums with a timing offset
   - fx & stabs: atmospheric hits spread out with randomised timing and pitch

4. sample loading - loads the samples into the audio engine. the system fetches the ogg audio files, decodes them into web audio buffers and stores them for quick playback :)

5. sequencing & playback - a 16th‑note sequencer schedules events in real time and plays the samples


![yubidnb screenshot](./image.png)

made with <3 and :3 at shipwrecked by [@v1peridae](https://github.com/v1peridae) and [@scherepi](https://github.com/scherepi) !!

inspired by this on [github](https://github.com/apvilkko/dnb-generator)

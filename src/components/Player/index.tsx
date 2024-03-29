
import Image from 'next/image'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '../../contexts/PlayerContext';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../Utils/convertDurationToTimeString';

export function Player(){

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const {
        episodeList,
        currentEpisodeIndex, 
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevius,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevius
        }
        = usePlayer();

    const episode = episodeList[currentEpisodeIndex];

    useEffect(()=>{
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying]);

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () =>{
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }
    

    return (
        <div className = {styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora {episode?.title}</strong>
            </header>

           {episode ? (
               <div className={styles.currentEpisode}>
                   <Image
                       width={592}
                       height={592}
                       src={episode.thumbnail}
                       objectFit="cover"
                   />
                   <strong>{episode.title}</strong>
                   <span>{episode.members}</span>
               </div>
           ) : (
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
           )}

            <footer className = {!episode ? styles.empty : ''}>
                <div className = {styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className = {styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                trackStyle = {{backgroundColor: '#84d361'}}
                                railStyle = {{backgroundColor: '#9f75ff'}}
                                handleStyle = {{borderColor: '#84d361', borderWidth: 4 }}
                            />
                        ):(
                            <div className = {styles.emptySlider}/>
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        loop={isLooping}
                        autoPlay
                        onPlay={()=> setPlayingState(true)}
                        onPause={()=> setPlayingState(false)}
                        onLoadedMetadata = {setupProgressListener}
                    />
                )}

                <div className = {styles.buttons}>
                    <button 
                        type = "button"         
                        disabled={!episode || episodeList.length === 1}
                        onClick = {toggleShuffle }
                        className = {isShuffling ? styles.isActive: ''} 
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" title="Shuffle"/>
                    </button>
                    <button type = "button" onClick={playPrevius} disabled={!episode || !hasPrevius}>
                        <img src="/play-previous.svg" alt="Tocar Anterior" title='Previus'/>
                    </button>
                    <button 
                        type = "button"     
                        className = {styles.playButton}     
                        disabled={!episode}
                        onClick={togglePlay}>

                        {isPlaying
                            ?<img src="/pause.svg" alt="Pause" title="Pause"/>
                            :<img src="/play.svg" alt="Tocar" title="Play"/>
                        }
                        
                    </button>
                    <button type = "button" onClick={playNext} disabled={!episode || !hasNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" title="Next"/>
                    </button>
                    <button 
                        type = "button"     
                        disabled={!episode} 
                        onClick = {toggleLoop}
                        className = {isLooping ? styles.isActive: ''}>
                        <img src="/repeat.svg" alt="Repetir" title="Repeat"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}
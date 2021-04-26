import {createContext, useState, ReactNode, useContext} from 'react';


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList : Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevius: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevius: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}


export function PlayerContextProvider({children}: PlayerContextProviderProps){
    
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
      }
  
    
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toggleLoop(){
        setIsLooping(!isLooping);
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling);
    }
  
    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevius = currentEpisodeIndex > 0;

    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevius(){
        if(hasPrevius){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return(
        <PlayerContext.Provider 
            value= {
                {
                    episodeList, 
                    currentEpisodeIndex, 
                    isPlaying,
                    isLooping,
                    isShuffling,
                    hasNext,
                    hasPrevius,
                    play,
                    playList,
                    playNext,
                    playPrevius,
                    togglePlay, 
                    toggleLoop,
                    toggleShuffle,
                    setPlayingState 
                }
            }
        >
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayer(){
    return useContext(PlayerContext);
}
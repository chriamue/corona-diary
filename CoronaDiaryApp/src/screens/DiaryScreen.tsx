import React from 'react';
import {
  ScrollView,
  Text
} from 'react-native';
import Diary, { loadDiary, saveDiary } from '../Diary';
import DiaryEntry from '../DiaryEntry';
import DiaryView from '../components/DiaryView';
import { loadPubkey } from '../Wallet';

interface Props { }
interface State {
  pubkey: string | null;
  diary: Diary;
}

class DiaryScreen extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pubkey: null,
      diary: new Diary()
    };
  }

  componentDidMount() {
    loadPubkey(this);
    loadDiary().then((diary) => { if (diary) this.setState({ diary }) });
  }

  onNewDiaryEntry(entry: DiaryEntry) {
    const { diary } = this.state;
    diary.addEntry(entry);
    saveDiary(diary);
    this.setState({ diary });
  }

  render() {
    if (!this.state.pubkey) {
      return null;
    }
    return (<ScrollView>
      <Text>Diary</Text>
      <DiaryView diary={this.state.diary} onNewEntry={(entry: DiaryEntry) => this.onNewDiaryEntry(entry)} />
    </ScrollView>
    );
  }
};

export default DiaryScreen;

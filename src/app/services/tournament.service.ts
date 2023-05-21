import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { TournamentDetails } from '../models/tournamentdetails';
import { TournamentTree } from '../models/tournamenttree';
import { TournamentDto } from '../models/dto/tournamentdto';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
    private dbPath = '/tournamentdetails';
    tournamentRef: AngularFirestoreCollection<TournamentDto>;
    tournamentDetails? : TournamentDetails;
    tournamentDtoList : TournamentDto[] = [];

    constructor(private db: AngularFirestore, private storage : AngularFireStorage) {
        this.tournamentRef = this.db.collection<TournamentDto>(this.dbPath);
    }
    

    createTournamentWithImage(tournament: TournamentDto, file : ImageData) {
        const id = Math.random().toString(36).substring(2);
        tournament.imageId = id;
        this.tournamentRef.add({... tournament
        });
        this.saveTournamentImage(file, id, tournament.title!);
    }

    createTournament(tournament: TournamentDto) {
        this.tournamentRef.add({... tournament
        });
    }

    saveTournamentImage(file : ImageData, id : string, name : string){
        const path = `images/${id}${name}`;
        const ref = this.storage.ref(path);
        const task = ref.put(file);
        task.snapshotChanges().pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(url => {
                // Here, you can save the URL to Firestore or perform any other operations with it
                console.log('Image URL:', url);
              });
            })
          ).subscribe();
    }

    update(id: string, data: any): Promise<void> {
        return this.tournamentRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.tournamentRef.doc(id).delete();
    }

    getAllTournaments() : Observable<TournamentDto[]> {
        return this.tournamentRef.snapshotChanges().pipe(
            map((snapshot)=>
            snapshot.map((doc) => {
                var data = doc.payload.doc.data() as TournamentDto;
                data.documentId = doc.payload.doc.id;
                return {...data};
            })
            )
        );
    }

    getTournamentImage(id : string, tournamenttree : TournamentTree) {
        const path = `images/${id}`;
        return this.storage.ref(path).getDownloadURL().subscribe((downloadUrl) => {
            tournamenttree.imageUrl = downloadUrl;
        });
    }
    
}

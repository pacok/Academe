import { TestBed, inject } from '@angular/core/testing';

import { UserChatService } from './userChat.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserChatService]
    });
  });

  it('should be created', inject([UserChatService], (service: UserChatService) => {
    expect(service).toBeTruthy();
  }));
});

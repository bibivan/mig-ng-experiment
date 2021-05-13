import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-button-files',
  templateUrl: './button-files.component.html',
  styleUrls: ['./button-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonFilesComponent implements OnInit {
  @Input() url: string
  @Input() urlWithGetParams: boolean

  hrefLink = ''

  constructor(
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.hrefLink = this.getTokenLink(this.url, this.urlWithGetParams)
  }

  private getTokenLink(url: string, hasGetParams = false): string {
    const bearer = `bearer=${ this.authentication.token }`

    if (hasGetParams) {
      return `${ url }&${ bearer }`
    }

    return `${ url }?${ bearer }`
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `<!-- Section 2 -->
    <section
      class="px-2 py-32 bg-white md:px-0 bg-no-repeat bg-cover"
      style="background-image: url('images/jlc_bg.png');"
    >
      <div class="container items-center px-5 mx-auto xl:px-5 justify-between ">
        <div class="flex flex-wrap items-center sm:-mx-3">
          <div class="w-full md:w-1/2 md:px-3 bg-white rounded-lg p-3">
            <div class="w-full">
              <h1
                class="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl mb-2"
              >
                <span class="block xl:inline"
                  >Welcome to JL Calingasan Service Center <br />
                  Where Affordability Meets Quality!</span
                >
              </h1>
              <p
                class="mx-auto text-base text-justify text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"
              >
                Explore our range of services, and discover how we can help keep
                your home or business running smoothly. Your satisfaction is our
                priority, and we’re here to make every service simple, seamless,
                and stress-free!
              </p>
            </div>
            <div class="flex justify-center py-3">
              <button class="bg-green-500 text-white hover:bg-green-800 p-3 rounded-lg">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section 3 -->
    <section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-36">
      <div class="flex w-full justify-center text-center xl:text-md">
        <h1 class="font-bold text-gray-800 text-4xl mt-6 mb-12">
          About the Company</h1>
      </div>
      <div
        class="box-border flex flex-col items-center content-center mb-8 px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16"
      >
        <!-- Content -->
        <div
          class="box-border order-first xl:text-lg md:text-md w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none"
        >
          <p
            class="box-border w-full text-black text-justify border-solid mt-8 mb-8 md:pl-6 xl:pl-10 xl:pr-2"
          >
            Established in the year 1995, J.L CALINGASAN SERVICE CENTER, is set
            out itself to be a leading SERVICE CENTER and INSTALLER in the area
            of BATANGAS. Owned and operated by the late Engr. Jaime Candido L.
            Calingasan back then and now by his wife, Mrs. Milagros A.
            Calingasan, a single proprietorship.
          </p>
        </div>
        <!-- Image -->
        <div
          class="box-border relative w-full max-w-md px-4 mt-5 mb-8 -ml-5 text-center justify-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10"
        >
          <img
            src="images/image1.png"
            class="pl-4 sm:pr-10 xl:pl-16 lg:pr-24"
          />
        </div>

        <!-- End  Content -->
      </div>
      <div class="flex w-full justify-center text-center">
        <h1 class="font-bold text-gray-800 text-4xl mt-8 mb-12">
          Mission of the Company
        </h1>
      </div>
      <div
        class="box-border flex flex-col items-center content-center mb-12 px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16"
      >
        <!-- Image -->
        <div
          class="box-border relative w-full max-w-md px-4 mt-8 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10"
        >
          <img
            src="images/image2.png"
            class="w-[900px] p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
          />
        </div>
        <!-- Content -->
        <div
          class="box-border order-first w-full xl:text-lg md:text-md text-black border-solid md:w-1/2 md:pl-10 md:order-none"
        >
          <ul
            class="text-justify list-disc xl:text-md list-inside pt-4 pb-8 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-8 xl:pr-24 xl:text-md"
          >
            <li>
             To provide quality, responsive, and efficient service to our
              customers.
            </li>
            <li>
              To provide honesty and integrity in the field of electronic
              service by focusing our efforts on gaining our customer’s trust
              and confidence.
            </li>
            <li>
              To motivate and fully equip each of our employees for the purpose
              of making them effective service providers and productive
              individuals.
            </li>
            <li>
              To empower our management team through education, training, and
              keeping channels of communication open.
            </li>
            <li>
              To make customer satisfaction our reward for all these efforts.
            </li>
          </ul>
        </div>

        <!-- End  Content -->
      </div>

      <div class="flex w-full justify-center text-center">
        <h1 class="font-bold text-gray-800 text-4xl mb-16 mt-8">
          Vision of the Company
        </h1>
      </div>
      <div
        class="box-border flex flex-col items-center xl:text-lg md:text-md content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16"
      >
        <!-- Content -->
        <div
          class="box-border w-full text-black text-justify border-solid md:w-1/2 md:pl-6 xl:pl-20"
        >
          <p>
            To become a globally competent service provider with a highly
            trained and efficient team of personnel whose honesty and efficiency
            can never be put into questions and always ready with quick response
            to all our customer’s concern.
          </p>
        </div>

        <div
          class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"
        >
          <img
            src="images/image3.png"
            class="pl-4 sm:pr-10 xl:pl-16 lg:pr-24"
          />
        </div>
      </div>
    </section> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}

import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Landing = () => {
  return (
    <div>
      <h1 className="text-5xl font-[poppins]">landing page</h1>
      <div className="h-[200px] w-[300px]">
        <ScrollableFeed className="flex flex-col gap-y-4">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eos.
            Inventore similique deserunt recusandae ratione voluptatibus
            provident aliquid! Dicta, ex beatae in saepe quos aut sapiente
            aperiam. Delectus, culpa officiis!
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolore
            voluptatibus blanditiis vel itaque doloremque illum, quo, esse
            cupiditate nisi reiciendis sapiente eos culpa soluta magni nemo!
            Voluptatibus, architecto ab!
          </div>
        </ScrollableFeed>
      </div>
    </div>
  );
};

export default Landing;
